import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SpinnerService } from './spinner.service';

@Component({
  standalone: true,
  selector: 'app-spinner',
  imports: [CommonModule, NzSpinModule],
  template: `
    <div *ngIf="spinnerService.isLoading" class="spinner-overlay">
      <nz-spin nzSize="large" nzTip="Cargando..."></nz-spin>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background-color: rgba(255, 255, 255, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
  `],
  providers: []
})
export class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) {}
}