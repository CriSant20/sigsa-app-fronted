import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardImage } from '@angular/material/card';
@Component({
  selector: 'app-cards',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardImage,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  card = {
    imageUrl: 'data:image/jpeg;base64,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',
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    content: 'This is the content inside the card. Customize it as needed.',
    icons: ['favorite', 'share', 'comment'],
  };
}
