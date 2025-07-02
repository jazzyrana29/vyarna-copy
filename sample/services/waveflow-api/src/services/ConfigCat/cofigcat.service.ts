import { Injectable } from '@nestjs/common';
import * as configCat from 'configcat-node';

@Injectable()
export class ConfigCatService {
  private readonly configCatClient: configCat.IConfigCatClient | null;

  constructor() {
    const apiKey = process.env.CONFIG_CAT_KEY || null;
    this.configCatClient = apiKey
      ? configCat.getClient(apiKey, configCat.PollingMode.ManualPoll)
      : null;
  }

  async getFeatureStatus(feature: string): Promise<boolean> {
    if (!this.configCatClient) {
      return false;
    }

    try {
      await this.configCatClient.forceRefreshAsync();
      return await this.configCatClient.getValueAsync(feature, false);
    } catch {
      return false;
    }
  }
}
