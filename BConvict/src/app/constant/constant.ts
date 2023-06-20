
export class MyDashboardResponse {
    data = { sys_user_id: undefined, filter: undefined };
}

// export class Profile {

//     sys_id: 'sys_id' | undefined
//     username: 'username' | undefined 
//     name: 'name' | undefined
//     firstname: 'firstname' | undefined
//     lastName: 'lastName' | undefined
//     email: 'email' | undefined
//     address: 'address' | undefined
//     gender: 'gender' | undefined
//     PAN_NO: 'PAN_NO' | undefined  
//     addhar: 'addhar' | undefined
//     Date_of_Birth: 'Date_of_Birth' | undefined
//     Last_Login: 'Last_Login' | undefined
//     Date_Created: 'Date_Created' | undefined
//     phoneNo: 'phoneNo' | undefined

// }

export class FirFilter {
    options = {
        sys_FIR_id: 'FIR ID',
        status: 'Status',
        offence: 'Offence',
        description: 'Description',
        police_station: 'Police Station',
        offence_date: 'Offence Date',
        updated_at: 'Updated At',
        created_at: 'Created At'
    };

}

export class Table {
    firData = [
        {
            display: 'FIR ID',
            value: 'sys_FIR_id'
        },{
            display: 'Status',
            value: 'status'
        },{
            display: 'Offence',
            value: 'offence'
        },{
            display: 'Description',
            value: 'description'
        },{
            display: 'Police Station',
            value: 'police_station'
        },{
            display: 'Offence Date',
            value: 'offence_date'
        },{
            display: 'Updated At',
            value: 'updated_at'
        },{
            display: 'Created At',
            value: 'created_at'
        },
    ];
}