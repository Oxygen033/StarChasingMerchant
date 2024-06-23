import { Test, TestingModule } from '@nestjs/testing';
import { JorneysService } from './journeys.service';

describe('JorneysService', () => {
  let service: JorneysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JorneysService],
    }).compile();

    service = module.get<JorneysService>(JorneysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
