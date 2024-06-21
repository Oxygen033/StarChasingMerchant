import { Test, TestingModule } from '@nestjs/testing';
import { JorneysGateway } from './jorneys.gateway';
import { JorneysService } from './jorneys.service';

describe('JorneysGateway', () => {
  let gateway: JorneysGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JorneysGateway, JorneysService],
    }).compile();

    gateway = module.get<JorneysGateway>(JorneysGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
