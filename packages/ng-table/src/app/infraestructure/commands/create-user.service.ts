import { CommandHandlerBase } from '../../domain/base-classes/command-handler.base';

export class UnitOfWork {
  // Add new repositories below to use this generic UnitOfWork

  // Convert TypeOrm Repository to a Domain Repository
  getUserRepository(correlationId: string): UserRepository {
    return new UserRepository(
      this.getOrmRepository(UserOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }

  getWalletRepository(correlationId: string): WalletRepository {
    return new WalletRepository(
      this.getOrmRepository(WalletOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }
}
export class CreateUserService extends CommandHandlerBase {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: CreateUserCommand,
  ): Promise<Result<ID, UserAlreadyExistsError>> {
    /* Use a repository provided by UnitOfWork to include everything 
       (including changes caused by Domain Events) into one 
       atomic database transaction */
    const userRepo: UserRepositoryPort = this.unitOfWork.getUserRepository(
      command.correlationId,
    );
    // user uniqueness guard
    if (await userRepo.exists(command.email)) {
      /** Returning an Error instead of throwing it
       *  so a controller can handle it explicitly */
      return Result.err(new UserAlreadyExistsError());
    }

    const user = UserEntity.create({
      email: new Email(command.email),
      address: new Address({
        country: command.country,
        postalCode: command.postalCode,
        street: command.street,
      }),
    });

    user.someBusinessLogic();

    const created = await userRepo.save(user);
    return Result.ok(created.id);
  }
}