import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoMetaService {
  constructor(private title: Title, private meta: Meta) {}

  setMeta(title: string, description: string, image?: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    if (image) {
      this.meta.updateTag({ property: 'og:image', content: image });
    }
  }
}
