import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url }) {
  const siteUrl = "https://nexoracreatives.co.ke"; // Your main domain
  const fullUrl = url.startsWith("http") ? url : `${siteUrl}${url}`;

  return (
    <Helmet>
      {/* 1. Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* 2. THE FIX: Canonical Link */}
      {/* This tells Google: "This URL is the master copy of this page" */}
      <link rel="canonical" href={fullUrl} />

      {/* 3. Open Graph (Facebook/LinkedIn) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      
      {/* 4. Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}