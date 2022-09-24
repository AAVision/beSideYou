import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgParticlesModule } from 'ng-particles'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports: [CommonModule,RouterModule,NgParticlesModule]
})
export class AppComponent {
  title = 'beSideYou';
  opts = {
    particles: {
      color: {
        value: [ '#ff0000', '#0000ff' ]
      },
      lineLinked: {
        enable: true,
        color: 'random'
      },
      move: {
        enable: true,
        speed: 5
      }
    }
  };
}
