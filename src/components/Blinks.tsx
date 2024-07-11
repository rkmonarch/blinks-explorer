import React from "react";
import BlinkCard from "./cards/BlinkCard";

const Images = [
  "https://s3-alpha-sig.figma.com/img/35be/6598/a096795824098e92b56ab04401477268?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hwxDrEbU25Z3mEx5RLbIoQ~TUbnVbuKhx2Rg13B7-NLzdoJvP8j7JgQatSa0tGVmiPsFpqMEUD-nbkGGPcW5yfYqfpI~xu-BC~o6reABmVq2MqN0-WgP4GJszw~E7B2kX8D3-un7Adk42y1yQs2cikN0q3Y5Lf3w6tZudHv8qvPGs3en~N4Kpva6gMpSwXIRlI3AKLtpSvCozdJCe~vazREJy4GnYsUsJdbN9Nco8Sz2XD6W43cSDU7XQlRqcmuGRRME3B8aOITE32NG0bwZl711o~1xqoH9WL49l47I~jrqqWPhkmxdQftmwV47PtW8nUEE-5wtCcbFo7OCljMFRQ__",
  "https://s3-alpha-sig.figma.com/img/4870/17b3/b4879845853b9d4be95b51c6936e63a3?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hdfaypRDM3B9ESxasUeLwTTniddELGPLrEemGGaBWpJOJwJcuqtxCfDxygQ2l71qzHxacePj2imWah1nDEhODiY4Ejl81Qrf64vOVjOpMZVodH0dp1~gkr4bqmmbhXcGXnW8Q4XiG3sJ0ljVpHZKBWHv3u4MdDnCevPKjNx~LBedEmMj5I-kPtwhUys5PTSX3BuRJcAgVBjh-M4leYfKEshunRAzykiTp-VN43BAGlbbNx83J5Qrjd9JvRoR7h-W92qeDMEwqdDKUZIPOT4z50qnzOb6bo3XlSv~1uHatk-eSS3KDwk~QAslqNhtE7-Uv-GbTjEaV1RkLzIpr3wMMQ__",
  "https://s3-alpha-sig.figma.com/img/c841/788d/ed28994ed8961699463dd42e5b38124b?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ah7uusiJFVo6P6DwBOzNDjF8iLM8Z-undDa3Q7BpYsz520kMnzUrpYNsIskSaY~Mcokg1LLAEAhcFqWYV7VjlpIo8thwphFHIM7-~o~J2aaMLRS~SrA6DZX-BolDO~39MvKLKT0ua2zQG-kuX~PgOdMPGuT84Rzyrj2A68pRIVdwFZVNKcWqupopwx6QuzmuyVDulZGhw5rt04kHI7h~vL4JJC-v33vWIaKZ9ZqYxOcG5Nvtz2sAHRQDiVDQdba-Jd2so9YTFya~hup~Fe7DeY7bmQbPLiLkkl1PzGTb-S7DmVH3vnW7wy7dfW5-9i9icy3wCmSXKN56Ggq36IRP7Q__",
  "https://s3-alpha-sig.figma.com/img/87d2/bcc5/06d34cb0119612c6e7b52db1b191b05d?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cs-LQYS92Jbxlkvo97SG6AAZJf44Nc-GhOiWlCjyscL35ZBZBErUKHsFkbcFEe5TTCb71AZPa71XO4Bz5tt5ikudar1aBbbw5I4zx1a-bLHftE8FvEa2yTc7d~h1KoR6ovm4eZo39fUhdBV5~XwBiQH28zqmmkSUoAyskLOdaKa9ISWjtRnlTCGdoHQWFXEhdAAQmuoRYKdvMNQYP-rh4SNDOIXD7gZXEW8V58M3oPWfTjVDHdcAVmKEwpmIbHateHqe76DDfMLphUiiQlnOm0LOlLFHLIZG7bNwppfulkHEdoA1KZp1S~9n4OTwHksGOvrhnv5QvYMQEgYdnyPTsg__",
  "https://s3-alpha-sig.figma.com/img/35be/6598/a096795824098e92b56ab04401477268?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hwxDrEbU25Z3mEx5RLbIoQ~TUbnVbuKhx2Rg13B7-NLzdoJvP8j7JgQatSa0tGVmiPsFpqMEUD-nbkGGPcW5yfYqfpI~xu-BC~o6reABmVq2MqN0-WgP4GJszw~E7B2kX8D3-un7Adk42y1yQs2cikN0q3Y5Lf3w6tZudHv8qvPGs3en~N4Kpva6gMpSwXIRlI3AKLtpSvCozdJCe~vazREJy4GnYsUsJdbN9Nco8Sz2XD6W43cSDU7XQlRqcmuGRRME3B8aOITE32NG0bwZl711o~1xqoH9WL49l47I~jrqqWPhkmxdQftmwV47PtW8nUEE-5wtCcbFo7OCljMFRQ__",
  "https://s3-alpha-sig.figma.com/img/4870/17b3/b4879845853b9d4be95b51c6936e63a3?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hdfaypRDM3B9ESxasUeLwTTniddELGPLrEemGGaBWpJOJwJcuqtxCfDxygQ2l71qzHxacePj2imWah1nDEhODiY4Ejl81Qrf64vOVjOpMZVodH0dp1~gkr4bqmmbhXcGXnW8Q4XiG3sJ0ljVpHZKBWHv3u4MdDnCevPKjNx~LBedEmMj5I-kPtwhUys5PTSX3BuRJcAgVBjh-M4leYfKEshunRAzykiTp-VN43BAGlbbNx83J5Qrjd9JvRoR7h-W92qeDMEwqdDKUZIPOT4z50qnzOb6bo3XlSv~1uHatk-eSS3KDwk~QAslqNhtE7-Uv-GbTjEaV1RkLzIpr3wMMQ__",
  "https://s3-alpha-sig.figma.com/img/c841/788d/ed28994ed8961699463dd42e5b38124b?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ah7uusiJFVo6P6DwBOzNDjF8iLM8Z-undDa3Q7BpYsz520kMnzUrpYNsIskSaY~Mcokg1LLAEAhcFqWYV7VjlpIo8thwphFHIM7-~o~J2aaMLRS~SrA6DZX-BolDO~39MvKLKT0ua2zQG-kuX~PgOdMPGuT84Rzyrj2A68pRIVdwFZVNKcWqupopwx6QuzmuyVDulZGhw5rt04kHI7h~vL4JJC-v33vWIaKZ9ZqYxOcG5Nvtz2sAHRQDiVDQdba-Jd2so9YTFya~hup~Fe7DeY7bmQbPLiLkkl1PzGTb-S7DmVH3vnW7wy7dfW5-9i9icy3wCmSXKN56Ggq36IRP7Q__",
  "https://s3-alpha-sig.figma.com/img/87d2/bcc5/06d34cb0119612c6e7b52db1b191b05d?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cs-LQYS92Jbxlkvo97SG6AAZJf44Nc-GhOiWlCjyscL35ZBZBErUKHsFkbcFEe5TTCb71AZPa71XO4Bz5tt5ikudar1aBbbw5I4zx1a-bLHftE8FvEa2yTc7d~h1KoR6ovm4eZo39fUhdBV5~XwBiQH28zqmmkSUoAyskLOdaKa9ISWjtRnlTCGdoHQWFXEhdAAQmuoRYKdvMNQYP-rh4SNDOIXD7gZXEW8V58M3oPWfTjVDHdcAVmKEwpmIbHateHqe76DDfMLphUiiQlnOm0LOlLFHLIZG7bNwppfulkHEdoA1KZp1S~9n4OTwHksGOvrhnv5QvYMQEgYdnyPTsg__",
];

export default function Blinks() {
  return (
    <section className="containter mx-auto columns-3">
      {Images.map((blink) => (
        <BlinkCard image={blink} key={blink}/>
      ))}
    </section>
  );
}
