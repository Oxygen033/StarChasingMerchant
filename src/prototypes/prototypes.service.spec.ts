import { Test, TestingModule } from '@nestjs/testing';
import { PrototypesService } from './prototypes.service';

describe('PrototypesService', () => {
  let service: PrototypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrototypesService],
    }).compile();

    service = module.get<PrototypesService>(PrototypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
