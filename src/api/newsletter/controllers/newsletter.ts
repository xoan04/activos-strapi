/**
 * newsletter controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::newsletter.newsletter', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params;

        try {
            const entity = await strapi.entityService.findOne('api::newsletter.newsletter', id, {
                populate: '*',
            });

            if (!entity) {
                ctx.notFound('Newsletter no encontrado');
                return;
            }

            return this.transformResponse(entity);
        } catch (err) {
            console.error('❌ Error al obtener el newsletter:', err);
            ctx.internalServerError('Error interno');
        }
    },

    async update(ctx) {
        const { id } = ctx.params;
        const { data } = ctx.request.body;

        try {
            const updated = await strapi.entityService.update('api::newsletter.newsletter', id, {
                data,
                populate: '*',
            });

            return this.transformResponse(updated);
        } catch (err) {
            console.error('❌ Error al actualizar el newsletter:', err);
            ctx.notFound('No se pudo actualizar el newsletter');
        }
    },

    async delete(ctx) {
        const { id } = ctx.params;

        try {
            // Verifica si existe
            const newsletter = await strapi.entityService.findOne('api::newsletter.newsletter', id, {
                populate: '*',
            });

            if (!newsletter) {
                return ctx.notFound('Newsletter no encontrado');
            }

            const result = await strapi.entityService.delete('api::newsletter.newsletter', id);
            return ctx.send({ message: 'Newsletter eliminado correctamente' }, 200);
        } catch (err) {
            console.error('❌ Error al eliminar el newsletter:', err);
            return ctx.internalServerError('Error al intentar eliminar el newsletter');
        }
    }
}));
