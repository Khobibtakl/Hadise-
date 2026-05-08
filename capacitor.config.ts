import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'khubaibtakl.hadits.af',
  appName: 'حديثونه',
  webDir: 'dist',
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon",
      iconColor: "#488AFF",
    }
  }
};

export default config;
