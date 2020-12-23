import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const HttpErrors = () => {
    return applyDecorators(
        ApiNotFoundResponse({ description: 'Not found' }),
        ApiBadRequestResponse({ description: 'Bad Request' }),
        ApiInternalServerErrorResponse({
            description: 'Internal Server Error',
        }),
        ApiUnauthorizedResponse({
            description: 'Unauthorized',
        }),
        ApiForbiddenResponse({ description: 'Forbidden' }),
    );

};
