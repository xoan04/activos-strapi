/**
 * consignaciones-form controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::consignaciones-form.consignaciones-form', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params;

        try {
            const entity = await strapi.entityService.findOne('api::consignaciones-form.consignaciones-form', id, {
                populate: '*',
            });

            if (!entity) {
                ctx.notFound('Formulario de consignación no encontrado');
                return;
            }

            return this.transformResponse(entity);
        } catch (err) {
            console.error('❌ Error al obtener el formulario de consignación:', err);
            ctx.internalServerError('Error interno');
        }
    },

    async update(ctx) {
        const { id } = ctx.params;
        const { data } = ctx.request.body;

        try {
            const updated = await strapi.entityService.update('api::consignaciones-form.consignaciones-form', id, {
                data,
                populate: '*',
            });

            return this.transformResponse(updated);
        } catch (err) {
            console.error('❌ Error al actualizar el formulario de consignación:', err);
            ctx.notFound('No se pudo actualizar el formulario de consignación');
        }
    },

    async delete(ctx) {
        const { id } = ctx.params;

        try {
            // Verifica si existe
            const form = await strapi.entityService.findOne('api::consignaciones-form.consignaciones-form', id, {
                populate: '*',
            });

            if (!form) {
                return ctx.notFound('Formulario de consignación no encontrado');
            }

            const result = await strapi.entityService.delete('api::consignaciones-form.consignaciones-form', id);
            return ctx.send({ message: 'Formulario de consignación eliminado correctamente' }, 200);
        } catch (err) {
            console.error('❌ Error al eliminar el formulario de consignación:', err);
            return ctx.internalServerError('Error al intentar eliminar el formulario de consignación');
        }
    }
}));
