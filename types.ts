export interface AdFormat {
  id: string;
  name: string;
  prompt: string;
  icon: JSX.Element;
}

export interface AdFormatCategory {
  name: string;
  formats: AdFormat[];
}

export interface AdVariation {
  id: string;
  imageUrl: string;
  text: string;
}

export interface GeneratedAd {
  id: string;
  formatId: string;
  imageUrl: string;
  text: string;
  originalPrompt: string;
  formatName: string;
  slogan?: string;
  variations?: AdVariation[];
}