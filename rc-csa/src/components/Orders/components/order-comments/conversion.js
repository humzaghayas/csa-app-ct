export const docToFormValues = (order)=>(
    order?.custom?.customFieldsRaw
        ?.filter(e=>e.name=="comments")[0]
        ?.value
)

export const commentsToUpdate = (newComment, olderComments)=>{
    return olderComments ? [...olderComments, newComment] : [newComment]
}