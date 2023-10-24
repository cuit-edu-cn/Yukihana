# 使用基于Ubuntu 20.04的基础映像
FROM ubuntu:20.04

# 设置环境变量
ENV DEBIAN_FRONTEND=noninteractive
ENV VNC_PASSWD=vncpasswd
COPY ./docker/startup.sh /root/startup.sh
COPY ./docker/supervisord.conf /root/ntqq/supervisord.conf
COPY ./ntqq/resources/app/app_launcher/index.js /root/ntqq/index.js

# 安装必要的软件包
RUN apt-get update && apt-get install -y \
    openbox \
    curl \
    unzip \
    x11vnc \
    xvfb \
    fluxbox \
    supervisor \
    libnotify4 \
    libnss3 \
    xdg-utils \
    libsecret-1-0 \
    libgbm1 \
    libasound2 \
    fonts-wqy-zenhei \
    git \
    gnutls-bin \    
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 安装novnc
RUN git config --global http.sslVerify false && git config --global http.postBuffer 1048576000 \
    && cd /opt && git clone https://github.com/novnc/noVNC.git \
    && cd /opt/noVNC/utils && git clone https://github.com/novnc/websockify.git \
    && cp /opt/noVNC/vnc.html /opt/noVNC/index.html \
    # 安装Linux QQ
    && curl -o /root/linuxqq_3.1.2-13107_amd64.deb https://dldir1.qq.com/qqfile/qq/QQNT/ad5b5393/linuxqq_3.1.2-13107_amd64.deb \
    && dpkg -i /root/linuxqq_3.1.2-13107_amd64.deb && apt-get -f install -y && rm /root/linuxqq_3.1.2-13107_amd64.deb \
    # 创建必要的目录
    && mkdir -p ~/.vnc \
    && chmod +x ~/startup.sh \
    && rm /etc/supervisor/supervisord.conf \
    && mv /root/ntqq/supervisord.conf /etc/supervisor/supervisord.conf \
    && rm /opt/QQ/resources/app/app_launcher/index.js \
    && mv /root/ntqq/index.js /opt/QQ/resources/app/app_launcher/index.js

# 设置容器启动时运行的命令
CMD ["/bin/bash", "-c", "/root/startup.sh"]