// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract FirRecord {
    struct Fir {
        string offence;
        uint256 offence_date;
        string police_station;
        string status;
        string description;
        uint256 created_at;
        uint256 updated_at;
    }

    mapping(uint256 => Fir) public firRecords;
    uint256 public firCount;

    event FirCreated(uint256 fir_id);

    function createFirRecord(
        string memory _offence,
        uint256 _offence_date,
        string memory _police_station,
        string memory _status,
        string memory _description
    ) public {
        firCount++;
        firRecords[firCount] = Fir({
            offence: _offence,
            offence_date: _offence_date,
            police_station: _police_station,
            status: _status,
            description: _description,
            created_at: block.timestamp,
            updated_at: block.timestamp
        });

        emit FirCreated(firCount);
    }

    function updateFirStatus(uint256 _fir_id, string memory _status) public {
        require(_fir_id <= firCount, "Invalid FIR ID");

        Fir storage fir = firRecords[_fir_id];
        fir.status = _status;
        fir.updated_at = block.timestamp;
    }
}
