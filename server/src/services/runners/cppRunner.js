export const prepareCppCode = (
code,
problem
)=>{


return `

#include<bits/stdc++.h>
using namespace std;


${code}


int main(){

}


`;

};