export class TodoEntity {
    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date|null
    ){}

    get isCompleted(){
        return !!this.completedAt;
    }

    // Esto podriamos ponerlo dentro de un logger, por ejemplo.
    public static fromObject( object: {[key: string]: any } ): TodoEntity{
        const { id, text, completedAt } = object;
        if ( !id )   throw 'Id is required';
        if ( !text ) throw 'Id is required';
        
        let newCompletedAt;
        if (completedAt){
            newCompletedAt = new Date(completedAt);
            if( isNaN( newCompletedAt.getTime())){
                throw 'CompletedAt is not a valid date'
            }
        }
        
        return new TodoEntity(
            id, text, completedAt
        )
    }

}