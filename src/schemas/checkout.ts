import { z } from "zod";

/* --- helpers ------------------------------------------------------------ */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const intlPhoneRegex = /^\+?\d{10,15}$/;   // e.g. +923001234567

/* --- main schema -------------------------------------------------------- */
export const checkoutFormSchema = z.object({
  /** Contact */
  emailOrPhone: z
    .string()
    .trim()
    .min(1, "Email or mobile phone is required")
    .refine(
      (v) => emailRegex.test(v) || intlPhoneRegex.test(v),
      "Enter a valid email address or phone number"
    ),
  newsletter: z.boolean().optional(),

  /** Name */
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),

  /** Screenshot (exactly one image file) */
  screenshot: z.instanceof(File, {
    message: "Screenshot is required",
  }).refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB"),

  /** Plan (readonly in the UI but still validated) */
  plan: z.string().min(1, "Plan is required"),
});

/** Inferred TypeScript type for easy use elsewhere */
// export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
