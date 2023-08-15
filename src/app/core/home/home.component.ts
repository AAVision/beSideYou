import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { Quote } from 'src/app/models/quote';
import { QuoteService } from 'src/app/services/quote.service';
import { Subject, catchError, finalize, map, of, takeUntil } from 'rxjs';
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
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('allDiv') allDiv: ElementRef;
  private onDestroy$: Subject<void> = new Subject();

  emojis = ["😃", "😍", "😎", "😏", "🙂", "🙋‍♀️", "🆗", "💎", "🌝", "😘", "✌", "🙌", "🔥", "☀", "🎈", "🌹", "🎀", "🏁", "🍀", "👀", "💝", "💙", "👌", "❤", "💪", "🍸", "🔑", "💖", "🌟", "🎉", "🌺", "🎶", "🏆", "🍓", "💘", "💜", "👊", "💋", "😘", "🙏", "👋", "💃", "💎", "🌙", "🎁", "⛄", "🌊", "⛵", "💰", "💛", "💚"]
  emoji = "";

  isLoaded = false;

  allQuotes: Quote[] = [];
  randomNumber: number;
  quote: Quote;

  constructor(private _quoteService: QuoteService) { }

  ngOnInit(): void {
    this._quoteService.getQuote()
      .pipe(
        map((data: Quote[]) => {
          if (data) {
            this.emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];
            this.randomNumber = this.getRandomInt(data.length);
            this.quote = data[this.randomNumber];
          }
        }),
        takeUntil(this.onDestroy$),
        catchError((err) => {
          console.log(err);
          return of([]);
        }),
        finalize(() => {
          this.isLoaded = true;
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  downloadImage(): void {
    var dt = new Date("December 25, 1995 23:15:20");
    htmlToImage.toBlob(this.allDiv.nativeElement)
      .then(function (blob) {
        saveAs(blob, `icareforyou_${dt.getTime()}.png`);
      });
  }

  speakText(): void {
    let utterance = new SpeechSynthesisUtterance(this.quote?.text + 'By ' + this.quote?.from);
    speechSynthesis.speak(utterance);
  }

}
