import { GraphQLServer } from "graphql-yoga";

//Type Definition (schema)
const Users = [
    {id: '1',name : 'Sankha Banerjee',email: 'sankha@city.com', age: 32, post:'1'},
    {id: '2',name : 'Santanu Shau',email: 'Santanu@city.com', age: 32, post:'2'},
    {id: '3',name : 'Suman Adak',email: 'Suman@city.com', age: 34, post:'3'},
]
const blogData = [
    {id: '1', title : 'What is Lorem Ipsum?', body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s', isPublished: false, user: '1'},
    {id: '2', title : 'Why do we use it?', body: 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ', isPublished: true, user: '2'},
    {id: '3', title : 'Where can I get some?', body: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected', isPublished: false, user: '3'},
]
const postcomments = [
    {id: '101', text : 'Great', author:'1', post:'1'},
    {id: '102', text : 'Awesome', author:'2',post:'2'},
    {id: '103', text : 'Good', author:'3',post:'3'},
]






// String // Boolean // Int // Float // ID 
const typeDefs = `
    type Query  {
        Posts(name:String): [blog]!
        Users(name:String): [User]!
        Comment: [Comment]!
        me: User!
        post: blog!
    },

    type User {
        id: ID!,
        name : String!,
        email: String!,
        age: Int,
        Bulletin: blog
    }
    type blog {
        id: ID!,
        title : String!,
        body: String!,
        isPublished: Boolean!,
        author: User!
    }
    type Comment{
        id: ID!, 
        text : String!,
        author: User!,
        Bulletin: blog!        
    }
`
const resolvers = {
    Query :{
        Users(parent,args) {
            return    args.name ?
             Users.filter(i => i.name.toLowerCase().indexOf(args.name.toLowerCase()) > -1) : 
             Users;      
        },
        Posts(parent,args) {
            return args.title ?
             blogData.filter(i => i.title.toLowerCase().indexOf(args.title.toLowerCase()) > -1):
             blogData;            
        },
        Comment(parent,args){
            return postcomments; 
        },
        me() {
            return {
                id: 'abc-123',
                name : 'Sankha Banerjee',
                email: 'sankhabanerjee92@gmail.com',
                age: 32  
            }
        },
        post() {
            return {
                id: 'abc-134',
                title : 'Lorem Ipsum is a simple dummy text',
                body: 'Hope is good thing, maybe the best thing, no good thing ever dies',
                isPublished: true
            }
        }
    },
    blog: {
        author(parent, args, ctx, info){           
            return  Users.find(user => user.id === parent.user);          
        }
    },
    User :{
        Bulletin(parent, args, ctx, info){           
            return  blogData.find(post => post.id === parent.post);  
        }
    },
    Comment:{
        author(parent, args, ctx, info){ 
            return  Users.find(user => user.id === parent.author);          
        },
        Bulletin(parent, args, ctx, info){     
           // console.log(parent)           
            return  blogData.find(post => post.id === parent.post);  
        }
    }
}
//Resolvers

const server = new GraphQLServer({typeDefs, resolvers});

server.start(() => {console.log('server is listening')});