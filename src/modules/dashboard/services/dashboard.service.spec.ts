import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { DashboardRepository } from '../repositories/dashboard.repository';

describe('DashboardService', () => {
  let service: DashboardService;
  let dashboardRepo: DashboardRepository;

  const mockDashboardRepository = {
    findAllWithRelations: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: DashboardRepository, useValue: mockDashboardRepository },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    dashboardRepo = module.get<DashboardRepository>(DashboardRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar os dados do dashboard', async () => {
    mockDashboardRepository.findAllWithRelations.mockResolvedValue([
      {
        area_total: 100,
        area_agriculture: 60,
        area_vegetation: 40,
        state: 'SP',
        harvests: [
          {
            crops: [{ name: 'Milho' }, { name: 'Soja' }],
          },
        ],
      },
      {
        area_total: 200,
        area_agriculture: 150,
        area_vegetation: 50,
        state: 'MG',
        harvests: [
          {
            crops: [{ name: 'Milho' }],
          },
        ],
      },
    ]);

    const result = await service.getDashboard();

    expect(result).toEqual({
      totalFarms: 2,
      totalHectares: 300,
      byState: { SP: 1, MG: 1 },
      landUse: { agricultura: 210, vegetacao: 90 },
      byCrop: { Milho: 2, Soja: 1 },
    });

    expect(dashboardRepo.findAllWithRelations).toHaveBeenCalledTimes(1);
  });
});
