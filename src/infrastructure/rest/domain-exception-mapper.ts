import { HttpStatus } from "@nestjs/common";
import { DomainException } from "src/domain/exceptions/DomainException";

export const DomainExceptionHttpMap: Record<string, number> = {
  ProductNotFoundException: HttpStatus.NOT_FOUND,
  InvalidProductStateException: HttpStatus.BAD_REQUEST,
};

export function getHttpStatusForDomainException(exception: DomainException): number {
  return DomainExceptionHttpMap[exception.constructor.name] ?? 500;
}
