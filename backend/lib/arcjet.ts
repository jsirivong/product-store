import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import dotenv from 'dotenv';

dotenv.config();

// initialize arcjet
export const aj = arcjet({
    key: process.env.ARCJET_KEY || "",
    characteristics: ["ip.src"],
    rules: [
        // "Shield" protects your app from common attacks e.g. SQL injection
        shield({mode:"LIVE"}),
        // Create a bot detection rule
        detectBot({
            mode: "LIVE", // Blocks requests
            // The "allow" blocks all bots except the following
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                "CATEGORY:MONITOR",
                "CATEGORY:PREVIEW"
            ]
        }),
        // rate limiting
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10
        })
    ]
})