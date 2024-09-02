import { Test, TestingModule } from '@nestjs/testing';
import { Respository } from './users.repository';

describe('Respository', () => {
  let provider: Respository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Respository],
    }).compile();

    provider = module.get<Respository>(Respository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
