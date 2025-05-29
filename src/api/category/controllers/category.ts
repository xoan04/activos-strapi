/**
 * category controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::category.category', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params;

        try {
            const entity = await strapi.entityService.findOne('api::category.category', id, {
                populate: '*',
            });

            if (!entity) {
                ctx.notFound('Categoría no encontrada');
                return;
            }

            return this.transformResponse(entity);
        } catch (err) {
            console.error('❌ Error al obtener la categoría:', err);
            ctx.internalServerError('Error interno');
        }
    },

    async update(ctx) {
        const { id } = ctx.params;
        const { data } = ctx.request.body;

        try {
            const updated = await strapi.entityService.update('api::category.category', id, {
                data,
                populate: '*',
            });

            return this.transformResponse(updated);
        } catch (err) {
            console.error('❌ Error al actualizar la categoría:', err);
            ctx.notFound('No se pudo actualizar la categoría');
        }
    },

    async delete(ctx) {
        const { id } = ctx.params;

        try {
            // Verifica si existe
            const category = await strapi.entityService.findOne('api::category.category', id, {
                populate: '*',
            });

            if (!category) {
                return ctx.notFound('Categoría no encontrada');
            }

            const result = await strapi.entityService.delete('api::category.category', id);
            return ctx.send({ message: 'Categoría eliminada correctamente' }, 200);
        } catch (err) {
            console.error('❌ Error al eliminar la categoría:', err);
            return ctx.internalServerError('Error al intentar eliminar la categoría');
        }
    }
}));
