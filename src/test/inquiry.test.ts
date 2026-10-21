import { describe, expect, it } from "vitest";
import { buildMailto, inquirySchema } from "@/lib/inquiry";

const valid = { name: "Ada & Co", email: "ada@example.com", service: "Transportation", message: "Hello there, line one\nline two?" };

describe("inquiry", () => {
  it("rejects missing name", () => {
    expect(inquirySchema.safeParse({ ...valid, name: " " }).success).toBe(false);
  });
  it("rejects invalid email", () => {
    expect(inquirySchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
  });
  it("rejects unknown service", () => {
    expect(inquirySchema.safeParse({ ...valid, service: "Plumbing" }).success).toBe(false);
  });
  it("rejects empty message", () => {
    expect(inquirySchema.safeParse({ ...valid, message: "" }).success).toBe(false);
  });
  it("builds an encoded mailto to info@passionoftehila.com", () => {
    const d = inquirySchema.parse(valid);
    const url = buildMailto(d);
    expect(url.startsWith("mailto:info@passionoftehila.com?subject=")).toBe(true);
    expect(url).toContain("Ada%20%26%20Co");
    expect(url).toContain("%0A");
    expect(url).not.toContain("&body=Name: ");
  });
});
