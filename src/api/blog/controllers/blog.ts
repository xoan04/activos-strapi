import { factories } from '@strapi/strapi'


export default factories.createCoreController('api::blog.blog', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params;

        try {
            const entity = await strapi.entityService.findOne('api::blog.blog', id, {
                populate: '*',
            });

            if (!entity) {
                ctx.notFound('Blog no encontrado');
                return;
            }

            return this.transformResponse(entity);
        } catch (err) {
            console.error('❌ Error al obtener el blog:', err);
            ctx.internalServerError('Error interno');
        }
    },

    async update(ctx) {
        const { id } = ctx.params;
        const { data } = ctx.request.body;

        try {
            const updated = await strapi.entityService.update('api::blog.blog', id, {
                data,
                populate: '*',
            });

            return this.transformResponse(updated);
        } catch (err) {
            console.error('❌ Error al actualizar el blog:', err);
            ctx.notFound('No se pudo actualizar el blog');
        }
    },
    async delete(ctx) {
        const { id } = ctx.params;

        try {
            // Verifica si existe
            const blog = await strapi.entityService.findOne('api::blog.blog', id, {
                populate: ['image', 'category'],
            });

            if (!blog) {
                return ctx.notFound('Blog no encontrado');
            }


            const result = await strapi.entityService.delete('api::blog.blog', id);
            return ctx.send({ message: 'Blog eliminado correctamente' }, 200);
        } catch (err) {
            console.error('❌ Error al eliminar el blog:', err);
            return ctx.internalServerError('Error al intentar eliminar el blog');
        }
    }


}));
