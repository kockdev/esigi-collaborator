import { Test, TestingModule } from '@nestjs/testing';
import { PhonesController } from './phone.controller';

describe('PhonesController', () => {
  let controller: PhonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhonesController],
    }).compile();

    controller = module.get<PhonesController>(PhonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});