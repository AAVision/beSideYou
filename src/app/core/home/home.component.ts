import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { Quote } from 'src/app/models/quote';
import { QuoteService } from 'src/app/services/quote.service';
import { Subscription } from 'rxjs';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('allDiv') allDiv: ElementRef;

  emojis =  ["😃","😍","😎","😏","🙂","🙋‍♀️","🆗","💎","🌝","😘","✌","🙌","🔥","☀","🎈","🌹","💄","🎀","🏁","🍀","👀","💝","💙","👌","❤","💪","🍸","🔑","💖","🌟","🎉","🌺","🎶","🏆","🍓","💘","💜","👊","💋","😘","🙏","👋","💃","💎","🌙","🎁","⛄","🌊","⛵","💰","💛","💚"]
  emoji = "";

  isLoaded = false;

  allQuotes:Quote[] = [];
  quotesSub: Subscription;
  randomNumber:number;
  quote:Quote;

  constructor(private _quoteService:QuoteService) { }

  ngOnInit(): void {
    this.quotesSub = this._quoteService.getQuote()
    .subscribe({
      next: (data:Quote[]) => {
          if(data){
            this.emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];
            this.randomNumber = this.getRandomInt(data.length);
            this.quote = data[this.randomNumber];
            this.isLoaded = true;
          }
      },
      error: err => console.error('An error occurred', err)
    });

  }

  getRandomInt(max):number {
    return Math.floor(Math.random() * max);
  }

  downloadImage(){
    htmlToImage.toBlob(this.allDiv.nativeElement)
      .then(function (blob) {
        saveAs(blob, `icareforyou.png`);
      });
  }


}
