import NextUiProviderWrapper from "@/providers/next-ui-provider-wrapper";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <NextUiProviderWrapper>{children}</NextUiProviderWrapper>;
}
