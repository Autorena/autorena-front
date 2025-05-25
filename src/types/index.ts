export interface StorySlide {
  background?: string;
  content: React.ReactNode;
  style?: React.CSSProperties;
}

export interface StoryGroup {
  id: number;
  img: string;
  title: string;
  slides: StorySlide[];
}
