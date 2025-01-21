import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UploadService } from './upload.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
interface FileItem {
  file: File;
  name: string;
  size: string;
  progress: number;
  status: string;
  uploaded: boolean;
}
@Component({
  
  selector: 'app-subir-comprobante',
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './subir-comprobante.component.html',
  styleUrl: './subir-comprobante.component.css',
  standalone: true,
  providers: [UploadService],
  encapsulation: ViewEncapsulation.ShadowDom,    // Desactiva el encapsulamiento de estilos
  

})
export class SubirComprobanteComponent {
  uploadedFiles: FileItem[] = [];

  constructor(private readonly uploadService: UploadService) { }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.handleFiles(files);
    }
  }

  // ... (mantener los métodos onDragOver, onDragLeave, onDrop igual que antes)

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.target as HTMLElement;
    dropZone.style.borderColor = '#6c63ff';
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.target as HTMLElement;
    dropZone.style.borderColor = '#ccc';
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.target as HTMLElement;
    dropZone.style.borderColor = '#ccc';
    
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  handleFiles(files: FileList): void {
    Array.from(files).forEach(file => {
      if (file.size > 52428800) {
        alert('El archivo excede el tamaño máximo permitido de 50MB');
        return;
      }

      const validTypes = ['.jpeg', '.jpg', '.png', '.pdf', '.mp4'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!validTypes.includes(fileExtension)) {
        alert('Tipo de archivo no válido. Por favor, sube JPEG, PNG, PDF o MP4.');
        return;
      }

      const fileItem: FileItem = {
        file: file,
        name: file.name,
        size: this.formatFileSize(file.size),
        progress: 0,
        status: 'Preparando...',
        uploaded: false
      };

      this.uploadedFiles.push(fileItem);
      this.simulateLocalLoad(fileItem);
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  simulateLocalLoad(fileItem: FileItem): void {
    const interval = setInterval(() => {
      if (fileItem.progress < 100) {
        fileItem.progress += 2;
      } else {
        fileItem.status = 'Listo para subir';
        clearInterval(interval);
      }
    }, 50);
  }

  uploadToServer(fileItem: FileItem): void {
    fileItem.status = 'Subiendo al servidor...';
    fileItem.progress = 0;

    this.uploadService.uploadFile(fileItem.file).subscribe({
      next: (response: any) => {
        fileItem.status = 'Subido exitosamente';
        fileItem.uploaded = true;
        // Aquí puedes manejar la respuesta del servidor
        console.log('Archivo subido:', response);
      },
      error: (error: any) => {
        fileItem.status = 'Error al subir';
        console.error('Error al subir el archivo:', error);
      }
    });
  }
  removeFile(fileItem: FileItem): void {
    const index = this.uploadedFiles.indexOf(fileItem);
    if (index !== -1) {
      this.uploadedFiles.splice(index, 1);
    }}
}