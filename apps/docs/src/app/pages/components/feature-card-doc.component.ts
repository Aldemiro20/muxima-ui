import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from '@muxima-ui/feature-card';

@Component({
  selector: 'muxima-feature-card-doc',
  standalone: true,
  imports: [CommonModule, FeatureCardComponent],
  templateUrl: './feature-card-doc.component.html',
  styleUrls: ['./feature-card-doc.component.scss']
})
export class FeatureCardDocComponent {
  copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  get importCode() {
    return `import { FeatureCardComponent } from '@muxima-ui/feature-card';

@Component({
  imports: [FeatureCardComponent]
})`;
  }

  get basicCode() {
    return `<muxima-feature-card
  icon="⚡"
  title="Lightning Fast"
  description="Optimized for performance with minimal bundle size and maximum speed."
  linkText="Learn more"
  linkUrl="#"
></muxima-feature-card>`;
  }

  get variantsCode() {
    return `<!-- Default -->
<muxima-feature-card variant="default" icon="🎨" title="Beautiful Design" description="Stunning UI components"></muxima-feature-card>

<!-- Glass -->
<muxima-feature-card variant="glass" icon="✨" title="Glassmorphism" description="Modern translucent effects"></muxima-feature-card>

<!-- Neon -->
<muxima-feature-card variant="neon" icon="🚀" title="Neon Cyberpunk" description="Futuristic glowing style"></muxima-feature-card>

<!-- Gradient -->
<muxima-feature-card variant="gradient" icon="🌈" title="Gradient Colors" description="Vibrant gradient backgrounds"></muxima-feature-card>`;
  }

  get sizesCode() {
    return `<!-- Small -->
<muxima-feature-card size="sm" icon="📱" title="Small Size" description="Compact card"></muxima-feature-card>

<!-- Medium (default) -->
<muxima-feature-card size="md" icon="💻" title="Medium Size" description="Standard card"></muxima-feature-card>

<!-- Large -->
<muxima-feature-card size="lg" icon="🖥️" title="Large Size" description="Spacious card"></muxima-feature-card>`;
  }

  get colorsCode() {
    return `<!-- Icon colors for default variant -->
<muxima-feature-card iconColor="primary" icon="💎" title="Primary" description="Primary color theme"></muxima-feature-card>
<muxima-feature-card iconColor="success" icon="✅" title="Success" description="Success color theme"></muxima-feature-card>
<muxima-feature-card iconColor="warning" icon="⚠️" title="Warning" description="Warning color theme"></muxima-feature-card>
<muxima-feature-card iconColor="error" icon="❌" title="Error" description="Error color theme"></muxima-feature-card>
<muxima-feature-card iconColor="info" icon="ℹ️" title="Info" description="Info color theme"></muxima-feature-card>`;
  }

  get glassCode() {
    return `<!-- Glass variant with different features -->
<muxima-feature-card
  variant="glass"
  icon="🔒"
  title="Enterprise Security"
  description="Bank-level encryption and security protocols to protect your data."
  linkText="Read security docs"
  linkUrl="#security"
></muxima-feature-card>

<muxima-feature-card
  variant="glass"
  icon="⚙️"
  title="Easy Integration"
  description="Seamless integration with your existing Angular applications."
  linkText="View integration guide"
  linkUrl="#integration"
></muxima-feature-card>`;
  }

  get neonCode() {
    return `<!-- Neon variant with cyberpunk styling -->
<muxima-feature-card
  variant="neon"
  icon="🎮"
  title="Gaming Performance"
  description="Ultra-low latency and high frame rate for the best gaming experience."
  linkText="Explore features"
  linkUrl="#gaming"
></muxima-feature-card>

<muxima-feature-card
  variant="neon"
  icon="🌐"
  title="Global Network"
  description="Distributed infrastructure across 50+ data centers worldwide."
  linkText="View locations"
  linkUrl="#network"
></muxima-feature-card>`;
  }

  get gradientCode() {
    return `<!-- Gradient variant -->
<muxima-feature-card
  variant="gradient"
  icon="📊"
  title="Advanced Analytics"
  description="Powerful insights and real-time data visualization for better decisions."
  linkText="See analytics"
  linkUrl="#analytics"
></muxima-feature-card>`;
  }
}
