import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../repositories/dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(
    private readonly dashboardRepo: DashboardRepository,
  ) {}

  async getDashboard() {
    const properties = await this.dashboardRepo.findAllWithRelations();

    const totalFarms = properties.length;
    const totalHectares = properties.reduce((sum, p) => sum + p.area_total, 0);

    const byState: Record<string, number> = {};
    const landUse = { agricultura: 0, vegetacao: 0 };
    const byCrop: Record<string, number> = {};

    for (const p of properties) {
      byState[p.state] = (byState[p.state] || 0) + 1;
      landUse.agricultura += p.area_agriculture;
      landUse.vegetacao += p.area_vegetation;

      for (const harvest of p.harvests) {
        for (const crop of harvest.crops || []) {
          byCrop[crop.name] = (byCrop[crop.name] || 0) + 1;
        }
      }
    }

    return {
      totalFarms,
      totalHectares,
      byState,
      landUse,
      byCrop,
    };
  }
}
