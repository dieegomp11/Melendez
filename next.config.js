const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/Melendez' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: {
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

module.exports = nextConfig
