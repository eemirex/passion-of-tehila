import { z } from "zod";

export const CONTACT_EMAIL = "info@passionoftehila.com";

export const SERVICES = [
  "General Contracts",
  "Transportation",
  "Construction & Development",
  "Physical Planning & Boundary Coordination",
] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name must be under 100 characters"),
  email: z.string().trim().min(1, "Please enter your email").email("Please enter a valid email address").max(255),
  service: z.enum(SERVICES, { message: "Please choose a service" }),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000, "Message must be under 2000 characters"),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export function buildMailto(data: Inquiry): string {
  const subject = `Project inquiry: ${data.service}`;
  const body = `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}\n\n${data.message}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
