/** @type {import('next').NextConfig} */
const nextConfig = {
    //added this to remove wagmi errors regarding pion-pretty,lokijs,encoding
    webpack: (config) => {
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
      },
}

module.exports = nextConfig
