import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OtpInputComponent } from '@muxima-ui/otp-input';

@Component({
  selector: 'app-otp-input-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, OtpInputComponent],
  templateUrl: './otp-input-doc.component.html',
  styleUrls: ['./otp-input-doc.component.scss']
})
export class OtpInputDocComponent {
  otpValue: string = '';
  
  // Exemplo 1: OTP padrão
  basicOtp: string = '';

  // Exemplo 2: OTP com 4 dígitos
  shortOtp: string = '';

  // Exemplo 3: OTP seguro (password)
  secureOtp: string = '';

  // Exemplo 4: OTP desabilitado
  disabledOtp: string = '123456';

  // Exemplo 5: OTP pequeno
  smallOtp: string = '';

  // Exemplo 6: OTP grande
  largeOtp: string = '';

  // Exemplo 7: OTP alfanumérico
  alphaOtp: string = '';

  // Exemplo 8: OTP com verificação
  verificationOtp: string = '';
  isVerifying: boolean = false;
  verificationResult: 'success' | 'error' | null = null;

  onOtpComplete(otp: string): void {
    console.log('OTP Completo:', otp);
    this.otpValue = otp;
  }

  onOtpChange(otp: string): void {
    console.log('OTP mudou:', otp);
  }

  // Simular verificação de OTP
  verifyOtp(otp: string): void {
    this.isVerifying = true;
    this.verificationResult = null;

    // Simular chamada de API
    setTimeout(() => {
      // Exemplo: código correto é "123456"
      if (otp === '123456') {
        this.verificationResult = 'success';
        console.log('✅ OTP Verificado com sucesso!');
      } else {
        this.verificationResult = 'error';
        console.log('❌ OTP Inválido!');
      }
      this.isVerifying = false;
    }, 1500);
  }

  typescriptCode = `import { OtpInputComponent } from '@muxima-ui/otp-input';

export class MyComponent {
  otpValue: string = '';

  onOtpComplete(otp: string) {
    console.log('OTP Completo:', otp);
    this.verifyOtp(otp);
  }

  onOtpChange(otp: string) {
    console.log('OTP mudou:', otp);
  }

  async verifyOtp(otp: string) {
    try {
      const response = await this.authService.verifyOtp(otp);
      if (response.valid) {
        console.log('✅ OTP Verificado!');
      }
    } catch (error) {
      console.error('❌ OTP Inválido');
    }
  }
}`;

  htmlCode = `<!-- OTP padrão com 6 dígitos -->
<muxima-otp-input
  [length]="6"
  [autoFocus]="true"
  (otpComplete)="onOtpComplete($event)"
  (otpChange)="onOtpChange($event)">
</muxima-otp-input>

<!-- OTP seguro (password) -->
<muxima-otp-input
  [length]="6"
  [secure]="true"
  size="large">
</muxima-otp-input>

<!-- OTP com 4 dígitos -->
<muxima-otp-input
  [length]="4"
  type="number"
  placeholder="•">
</muxima-otp-input>`;

  formCode = `import { FormControl } from '@angular/forms';

// Usando com Reactive Forms
otpControl = new FormControl('');

constructor() {
  this.otpControl.valueChanges.subscribe(value => {
    if (value.length === 6) {
      this.verifyOtp(value);
    }
  });
}`;

  stylingCode = `// Customizar cores via CSS
::ng-deep muxima-otp-input {
  .otp-input {
    border-color: #10b981;
    
    &:focus {
      border-color: #059669;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
  }
}`;
}
