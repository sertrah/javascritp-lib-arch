import { Command } from './command.base';

export interface UnitOfWorkPort {
  execute<T>(
    correlationId: string,
    callback: () => Promise<T>,
    options?: unknown,
  ): Promise<T>;
}

export abstract class CommandHandlerBase<
  CommandHandlerReturnType = unknown,
  CommandHandlerError extends Error = Error
> {
  constructor(protected readonly unitOfWork: UnitOfWorkPort) {}

  // Forces all command handlers to implement a handle method
  abstract handle(
    command: Command,
  ): Promise<any>;

  /**
   * Execute a command as a UnitOfWork to include
   * everything in a single atomic database transaction
   */
  execute(
    command: Command,
  ): Promise<any> {
    return this.unitOfWork.execute(command.correlationId, async () =>
      this.handle(command),
    );
  }
}