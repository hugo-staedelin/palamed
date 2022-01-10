import { Global, Module } from '@nestjs/common';
import { TypeOrmConfigService } from './type-orm-config.service';

@Global()
@Module({
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService]
})
export class TypeOrmConfigModule {}
