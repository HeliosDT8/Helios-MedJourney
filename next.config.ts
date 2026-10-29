import type {NextConfig} from "next";
const nextConfig:NextConfig={poweredByHeader:false,async redirects(){return [{source:"/business-intelligence",destination:"/employers",permanent:true}]}};export default nextConfig;
