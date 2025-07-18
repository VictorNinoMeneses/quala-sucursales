import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ISucursal } from '@models/sucursal.model';
import { SucursalService } from '@services/sucursal.service';
import { MonedaService } from '@services/moneda.service';
import { IMoneda } from '@models/moneda.model';
import { SpinnerService } from 'app/shared/spinner/spinner.service';


@Component({
  selector: 'app-sucursal-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzSelectModule
  ],
  templateUrl: './sucursal-modal.component.html',
  styleUrls: ['./sucursal-modal.component.css']
})
export class SucursalModalComponent implements OnInit {

  @Input() sucursal?: ISucursal;
  @Input() esEdicion = false;

  form!: FormGroup;
  monedas: IMoneda[] = [];

  constructor(
    private modalRef: NzModalRef,
    private sucursalService: SucursalService,
    private monedaService: MonedaService,
    private fb: FormBuilder,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      codigo: [{ value: this.sucursal?.codigo || 0, disabled: this.esEdicion }],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      direccion: ['', [Validators.required, Validators.maxLength(250)]],
      identificacion: ['', [Validators.required, Validators.maxLength(50)]],
      fechaCreacion: [new Date(), [Validators.required]],
      moneda: ['', [Validators.required]]
    });

    if (this.sucursal) {
      this.esEdicion = true;
      this.form.patchValue(this.sucursal);
    }

    this.monedaService.obtenerMonedas().subscribe({
      next: (data) => this.monedas = data,
      error: (err) => console.error('Error al cargar monedas', err)
    });

  }

  guardar(): void {
    if (this.form.invalid) return;

    const data: ISucursal = this.form.getRawValue();
    this.spinner.show();

    const obs = this.esEdicion
      ? this.sucursalService.actualizarSucursal(data.codigo, data)
      : this.sucursalService.crearSucursal(data);

    obs.subscribe({
      next: () => {
        this.modalRef.close('refresh');
        this.spinner.hide();
      },
      error: () => this.spinner.hide()
    });
  }

  cancelar(): void {
    this.modalRef.close();
  }

  deshabilitarFechasAnteriores = (fecha: Date): boolean => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fecha < hoy;
  };
}