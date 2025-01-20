import { Component } from '@angular/core';
import { MenuComponent } from '../../Components/menu/menu.component';
interface Card {
  imageUrl: string;
  title: string;
  subtitle: string;
  content: string;
  icons: string[];
}

@Component({
  selector: 'app-pantalla-gestion-administrador',
  imports: [MenuComponent],
  templateUrl: './pantalla-gestion-administrador.component.html',
  styleUrls: ['./pantalla-gestion-administrador.component.css'],
})
export class PantallaGestionAdministradorComponent {
  cards: Card[] = [
    {
      imageUrl: 'https://via.placeholder.com/300x180',
      title: 'Card Title 1',
      subtitle: 'Card Subtitle 1',
      content:
        'This is an example card content. You can replace it with your content.',
      icons: ['edit', 'delete'],
    },
    {
      imageUrl: 'https://via.placeholder.com/300x180',
      title: 'Card Title 2',
      subtitle: 'Card Subtitle 2',
      content: 'This is another example card content. Customize as needed.',
      icons: ['favorite', 'share'],
    },
  ];
}
