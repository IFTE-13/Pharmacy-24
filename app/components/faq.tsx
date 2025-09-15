import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type FAQ = {
  value: string
  question: string
  answer: string[]
}

const faqs: FAQ[] = [
  {
    value: "item-1",
    question: "Product Information",
    answer: [
      "Pharmacy 24 provides a wide range of genuine medicines, health supplements, and wellness products sourced from trusted suppliers.",
      "All medicines are stored and handled under strict safety standards to ensure quality and reliability.",
    ],
  },
  {
    value: "item-2",
    question: "Shipping & Delivery",
    answer: [
      "We offer fast delivery across the city, with same-day delivery available for urgent orders placed before 6 PM.",
      "Every order is carefully packaged, and you can track your medicine delivery in real-time through your account.",
    ],
  },
  {
    value: "item-3",
    question: "Return & Refund Policy",
    answer: [
      "Medicines can be returned within 7 days of purchase if they are unopened, unused, and in their original packaging.",
      "Refunds are processed within 48 hours after verification. For health and safety reasons, opened medicine packages cannot be returned.",
    ],
  },
  {
    value: "item-4",
    question: "Customer Support",
    answer: [
      "Our support team is available 24/7 to assist with orders, prescriptions, and product inquiries.",
      "You can reach us via phone, live chat, or email for quick and reliable assistance.",
    ],
  },
]

export function FAQAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="container mx-auto px-6 py-12 md:py-20"
      defaultValue="item-1"
    >
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {faq.answer.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
