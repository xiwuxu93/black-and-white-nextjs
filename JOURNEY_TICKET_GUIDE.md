# Journey Monetization Support Ticket Guide

This file contains the exact fields and text you need to copy and paste to submit your Zendesk support ticket to Journey by Mediavine.

---

## 📋 Form Options to Select

| Form Field | Option to Select / Enter | Notes |
| :--- | :--- | :--- |
| **Please choose your issue below** | `Missing Ads` | Select this in the dropdown. |
| **Your email address** | `xiwuxu93@gmail.com` | |
| **Site Owner** | `xu xiwu` | Site owner's first and last name. |
| **Site Name** | `Black and White Image Converter` | |
| **Site URL** | `https://bwconverter.com/` | |
| **Current CMS** | `Other - Please include in your description.` | Select this since you use Next.js (React). |
| **I have tested ads by appending ?test=placeholders...** | **Checked / Yes** | |
| **Does your site have a sidebar?** | **Yes, I have a designated sidebar.** | Select **Yes** since we built a 300px sidebar. |
| **Which ad units are missing?** | 1. `In-Content Ads`<br>2. `Sticky Sidebar Ad` | Select **both** of these checkboxes. |
| **Did you clear your site's cache(s)?** | **Yes** | Select **Yes** (all CDN and browser caches are cleared). |

---

## ✉️ Subject (主题)

Copy and paste this into the **Subject** input field:

```text
In-content and Sticky Sidebar ads are missing on our Next.js pages
```

---

## ✍️ Description (描述)

Copy and paste this text block into the **Description** textarea:

```text
Hi Journey Support Team,

We are experiencing an issue where both In-Content ads and our Sticky Sidebar ad units are not populating on our website.

Here are the technical details of our setup:
1. CMS: We are running a custom, server-side rendered Next.js (React) application.
2. Caching: We have cleared all CDN caches (Vercel CDN) and local browser caches.
3. Troubleshooting: We tested our pages by appending `?test=placeholders` (specifically checking the blog post: https://bwconverter.com/blog/how-to-make-photo-black-and-white/?test=placeholders and our homepage: https://bwconverter.com/?test=placeholders). We observed that only the bottom floating Adhesion ad is loading, while no in-content paragraphs or sidebar container units are getting injected.
4. Layout Templates & Classes: 
   - For blog content, we updated our templates to wrap the text inside standard semantic elements: `<article class="entry-content post-content">`.
   - For our homepage and image editor views, we implemented a 12-column grid providing a dedicated sidebar container with the ID `#primary-sidebar` (and standard classes `sidebar widget-area`), containing a placeholder unit with the class `.grow-sidebar-ad` that is exactly 300px wide.

Could you please trigger a manual crawl and refresh of our domain to map these new placements and enable our in-content and sidebar ad auctions?

Thank you for your assistance.

Best regards,
Xu Xiwu
```

---

## 💡 What to do next:
1. Copy the **Subject** and **Description** from above into your Zendesk form.
2. Click **Submit** (提交请求).
3. The Journey technical support team usually replies within **24–48 hours** to confirm they have triggered a manual crawl. Once they do, the ads should automatically start filling the spaces on your live site.
