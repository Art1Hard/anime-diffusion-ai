FROM node:20-bookworm

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    unzip \
    wget \
    git \
    xz-utils \
    && rm -rf /var/lib/apt/lists/*

# Android SDK
ENV ANDROID_HOME=/opt/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

RUN mkdir -p $ANDROID_HOME/cmdline-tools \
    && cd /tmp \
    && wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip \
    && unzip commandlinetools-linux-11076708_latest.zip \
    && mkdir -p $ANDROID_HOME/cmdline-tools/latest \
    && mv cmdline-tools/* $ANDROID_HOME/cmdline-tools/latest/ \
    && rm commandlinetools-linux-11076708_latest.zip

RUN yes | sdkmanager --licenses || true

RUN sdkmanager \
    "platform-tools" \
    "platforms;android-34" \
    "build-tools;34.0.0"

RUN npm install -g eas-cli@latest

WORKDIR /app