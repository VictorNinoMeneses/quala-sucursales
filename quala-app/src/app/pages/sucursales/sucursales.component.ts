import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SucursalService } from '@services/sucursal.service';
import { ISucursal } from '@models/sucursal.model';
import { SucursalModalComponent } from '@components/sucursal-modal/sucursal-modal.component';
import { SpinnerService } from 'app/shared/spinner/spinner.service';
import { NavbarComponent } from 'app/shared/navbar/navbar.component';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzPopconfirmModule,
    NzTableModule,
    NzModalModule,
    NavbarComponent
  ],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.css'
})

export class SucursalesComponent implements OnInit {
  sucursales: ISucursal[] = [];
  editCodigo: number | null = null;
  editCache: { [codigo: number]: { edit: boolean; data: ISucursal } } = {};

  constructor(
    private sucursalService: SucursalService,
    private modal: NzModalService,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.cargarSucursales();
  }

  cargarSucursales(): void {
    this.spinner.show();
    this.sucursalService.obtenerSucursales().subscribe({
      next: (data) => {
        this.sucursales = data;
        this.actualizarEditCache();
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error al cargar sucursales', error);
        this.spinner.hide();
      }
    });
  }

  private actualizarEditCache(): void {
    this.editCache = {};
    this.sucursales.forEach(sucursal => {
      this.editCache[sucursal.codigo] = {
        edit: false,
        data: { ...sucursal }
      };
    });
  }

  startEdit(codigo: number): void {
    this.editCache[codigo].edit = true;
  }

  cancelEdit(codigo: number): void {
    const index = this.sucursales.findIndex(item => item.codigo === codigo);
    if (index >= 0) {
      this.editCache[codigo] = {
        data: { ...this.sucursales[index] },
        edit: false
      };
    }
  }

  saveEdit(codigo: number): void {
    const index = this.sucursales.findIndex(item => item.codigo === codigo);
    const updated = this.editCache[codigo].data;
    this.spinner.show();
    this.sucursalService.actualizarSucursal(codigo, updated).subscribe({
      next: () => {
        Object.assign(this.sucursales[index], updated);
        this.editCache[codigo].edit = false;
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error al actualizar sucursal', error);
        this.spinner.hide();
      }
    });
  }

  eliminarSucursal(codigo: number): void {
    this.spinner.show();
    this.sucursalService.eliminarSucursal(codigo).subscribe({
      next: () => {
        this.cargarSucursales(); // Esto ya tiene el spinner internamente
      },
      error: (error) => {
        console.error('Error al eliminar sucursal', error);
        this.spinner.hide();
      }
    });
  }

  crearSucursal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Agregar Sucursal',
      nzContent: SucursalModalComponent,
      nzFooter: null
    });

    const contentComponent = modalRef.getContentComponent();
    if (contentComponent) {
      contentComponent.esEdicion = false;
    }

    modalRef.afterClose.subscribe(result => {
      if (result === 'refresh') {
        this.cargarSucursales();
      }
    });
  }

  editarSucursal(sucursal: ISucursal): void {
    const modalRef = this.modal.create({
      nzTitle: 'Editar Sucursal',
      nzContent: SucursalModalComponent,
      nzFooter: null
    });

    const contentComponent = modalRef.getContentComponent();
    if (contentComponent) {
      contentComponent.sucursal = { ...sucursal };
      contentComponent.esEdicion = true;
    }

    modalRef.afterClose.subscribe(result => {
      if (result === 'refresh') {
        this.cargarSucursales();
      }
    });
  }
}