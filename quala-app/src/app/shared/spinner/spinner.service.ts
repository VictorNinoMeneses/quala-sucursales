import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading = false;

  show(): void {
    this.isLoading = true;
  }

  hide(): void {
    this.isLoading = false;
  }
}
